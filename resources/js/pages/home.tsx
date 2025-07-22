import React from 'react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 flex items-center justify-center">
            <div className="text-center p-10 bg-white rounded-3xl shadow-xl">
                <h1 className="text-4xl font-bold text-pink-600 mb-4">🌈 Welcome Kids!</h1>
                <p className="text-lg text-gray-700">
                    Discover the weather and nature with fun games and activities!
                </p>
            </div>
        </div>
    );
}
