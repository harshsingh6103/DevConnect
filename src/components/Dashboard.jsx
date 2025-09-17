import React, { useState } from 'react';
import { MessageCircle, Heart, X, Users, Send, Inbox, User, MapPin, Code, Calendar } from 'lucide-react';
import Navbar from './Navbar';
import ChatButton from './ChatButton';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('discover');

  // Mock data for potential connections
  const potentialConnections = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Full Stack Developer',
      location: 'San Francisco, CA',
      skills: ['React', 'Node.js', 'Python'],
      bio: 'Passionate about building scalable web applications and mentoring junior developers.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      joinedDate: '2023'
    },
    {
      id: 2,
      name: 'Alex Rodriguez',
      title: 'Mobile App Developer',
      location: 'Austin, TX',
      skills: ['React Native', 'Swift', 'Kotlin'],
      bio: 'Creating beautiful mobile experiences with a focus on user-centered design.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      joinedDate: '2022'
    },
    {
      id: 3,
      name: 'Emily Johnson',
      title: 'DevOps Engineer',
      location: 'Seattle, WA',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      bio: 'Automating deployments and building robust infrastructure for modern applications.',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      joinedDate: '2023'
    }
  ];

  // Mock data for connections
  const [sentRequests] = useState([
    {
      id: 1,
      name: 'Michael Brown',
      title: 'Frontend Developer',
      status: 'pending',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      sentDate: '2 days ago'
    },
    {
      id: 2,
      name: 'Lisa Wang',
      title: 'UX Designer',
      status: 'accepted',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400',
      sentDate: '1 week ago'
    }
  ]);

  const [receivedRequests] = useState([
    {
      id: 1,
      name: 'David Kim',
      title: 'Backend Developer',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
      receivedDate: '1 day ago',
      mutualConnections: 3
    },
    {
      id: 2,
      name: 'Anna Martinez',
      title: 'Data Scientist',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      receivedDate: '3 days ago',
      mutualConnections: 1
    }
  ]);

  const handleInterested = (id) => {
    console.log('Interested in user:', id);
    // API call will be implemented later
  };

  const handleReject = (id) => {
    console.log('Rejected user:', id);
    // API call will be implemented later
  };

  const handleAcceptRequest = (id) => {
    console.log('Accepted request:', id);
    // API call will be implemented later
  };

  const handleRejectRequest = (id) => {
    console.log('Rejected request:', id);
    // API call will be implemented later
  };

  const handleStartChat = (id) => {
    console.log('Start chat with user:', id);
    // Chat functionality will be implemented later
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Discover new connections and grow your network</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('discover')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'discover'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Discover</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('connections')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'connections'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>My Connections</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === 'requests'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Inbox className="h-4 w-4" />
                  <span>Requests</span>
                  {receivedRequests.length > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {receivedRequests.length}
                    </span>
                  )}
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'discover' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {potentialConnections.map((person) => (
              <div
                key={person.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{person.name}</h3>
                      <p className="text-blue-600 font-medium">{person.title}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{person.location}</span>
                    <Calendar className="h-4 w-4 ml-4 mr-1" />
                    <span>Joined {person.joinedDate}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{person.bio}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {person.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleInterested(person.id)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <Heart className="h-4 w-4" />
                      <span>Interested</span>
                    </button>
                    <button
                      onClick={() => handleReject(person.id)}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Pass</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sent Requests</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sentRequests.map((request) => (
                  <div key={request.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center space-x-4">
                      <img
                        src={request.image}
                        alt={request.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{request.name}</h3>
                        <p className="text-sm text-gray-600">{request.title}</p>
                        <p className="text-xs text-gray-500 mt-1">Sent {request.sentDate}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {request.status}
                        </span>
                        {request.status === 'accepted' && (
                          <button
                            onClick={() => handleStartChat(request.id)}
                            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Received Requests</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {receivedRequests.map((request) => (
                  <div key={request.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={request.image}
                        alt={request.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{request.name}</h3>
                        <p className="text-sm text-gray-600">{request.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {request.mutualConnections} mutual connections
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">Received {request.receivedDate}</p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request.id)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <ChatButton />
    </div>
  );
};

export default Dashboard;