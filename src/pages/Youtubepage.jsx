import React, { useState, useEffect } from 'react';
import { Youtube, ArrowLeft, Play, Eye, Clock, Calendar, ExternalLink, Heart } from 'lucide-react';

export const YouTubePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const CHANNEL_ID = 'UCPpEV25F4A2r_yc0sxKniPA';

  useEffect(() => {
    loadYouTubeVideos();
  }, []);

  const loadYouTubeVideos = async () => {
    setLoading(true);
    setError(null);
    
    const API_KEY = 'AIzaSyCDwLWVfeTU5WlfPwG-2uu2B7U1e3lIzGs';
    
    try {
      // Step 1: Fetch latest videos from the channel
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20&type=video`
      );
      
      if (!searchResponse.ok) {
        throw new Error('Failed to fetch videos from YouTube');
      }
      
      const searchData = await searchResponse.json();
      
      if (!searchData.items || searchData.items.length === 0) {
        setVideos([]);
        setLoading(false);
        return;
      }
      
      // Step 2: Get video IDs for fetching statistics
      const videoIds = searchData.items.map(item => item.id.videoId).join(',');
      
      // Step 3: Fetch video statistics and content details
      const statsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=statistics,contentDetails`
      );
      
      if (!statsResponse.ok) {
        throw new Error('Failed to fetch video statistics');
      }
      
      const statsData = await statsResponse.json();
      
      // Step 4: Combine video data with statistics
      const videosWithStats = searchData.items.map((item, index) => {
        const stats = statsData.items[index] || {};
        return {
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
          publishedAt: item.snippet.publishedAt,
          channelTitle: item.snippet.channelTitle,
          views: stats.statistics?.viewCount || '0',
          likes: stats.statistics?.likeCount || '0',
          duration: stats.contentDetails?.duration || 'PT0S'
        };
      });
      
      setVideos(videosWithStats);
      if (videosWithStats.length > 0) {
        setSelectedVideo(videosWithStats[0]);
      }
    } catch (err) {
      console.error('Error loading YouTube videos:', err);
      setError(err.message || 'Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');
    
    if (hours) return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    return `${minutes || '0'}:${seconds.padStart(2, '0')}`;
  };

  const formatViews = (views) => {
    const num = parseInt(views);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowPlayer(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading YouTube videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b-4 border-red-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-xl">
                <Youtube className="w-8 h-8 text-red-600" />
              </div>
              
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  YouTube Videos
                </h1>
                <p className="text-gray-600">
                  Latest IDS Videos - Tech Insights & Updates
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
             
              
              <a
                href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition flex items-center font-semibold shadow-md"
              >
                <Youtube className="w-5 h-5 mr-2" />
                Visit Channel
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Video Player */}
        {selectedVideo && (
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.id}${showPlayer ? '?autoplay=1' : ''}`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {selectedVideo.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 text-gray-600">
                  <div className="flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-red-600" />
                    <span className="font-semibold">{formatViews(selectedVideo.views)} views</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-600" />
                    <span className="font-semibold">{formatViews(selectedVideo.likes)} likes</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-red-600" />
                    <span>{formatDate(selectedVideo.publishedAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-red-600" />
                    <span>{formatDuration(selectedVideo.duration)}</span>
                  </div>
                </div>
                
                <div className="border-t pt-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">About this video</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedVideo.description}
                  </p>
                </div>
                
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  Watch on YouTube
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">All Videos</h3>
            <div className="text-sm text-gray-500">
              Latest uploads from IDS Channel
            </div>
          </div>
          
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoClick(video)}
                  className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group ${
                    selectedVideo?.id === video.id ? 'ring-4 ring-red-600' : ''
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/90 text-white px-2 py-1 rounded text-sm font-bold backdrop-blur-sm">
                      {formatDuration(video.duration)}
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-red-600 rounded-full p-4 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-2xl">
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                    </div>
                    
                    {/* Selected Indicator */}
                    {selectedVideo?.id === video.id && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        NOW PLAYING
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition min-h-[3.5rem]">
                      {video.title}
                    </h4>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                      {video.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm pt-4 border-t">
                      <div className="flex items-center text-gray-600">
                        <Eye className="w-4 h-4 mr-1 text-red-600" />
                        <span className="font-semibold">{formatViews(video.views)}</span>
                      </div>
                      <span className="text-gray-500">{formatDate(video.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Youtube className="w-24 h-24 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Videos Yet</h3>
              <p className="text-gray-600 mb-6">Check back later for new content</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-red-50 border-t-4 border-red-600 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <Youtube className="w-12 h-12 text-red-600 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Subscribe to IDS Channel</h3>
          <p className="text-gray-600 mb-4">Get notified about new videos and updates</p>
          <a
            href={`https://www.youtube.com/channel/${CHANNEL_ID}?sub_confirmation=1`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold text-lg shadow-lg"
          >
            <Youtube className="w-6 h-6 mr-2" />
            Subscribe Now
          </a>
        </div>
      </div>
    </div>
  );
};