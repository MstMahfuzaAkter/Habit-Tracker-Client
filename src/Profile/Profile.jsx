import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { IoLogOut, IoSettingsSharp, IoCalendarOutline, IoMailOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { LuRotate3D } from "react-icons/lu";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, signOutUser } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-base-200 p-6 rounded-full mb-6">
          <LuRotate3D className="text-6xl text-base-content/20 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-base-content/60 mb-6 max-w-xs">
          Please log in to your account to view and manage your profile settings.
        </p>
        <Link to="/auth/login" className="btn btn-primary rounded-xl px-8">
          Log In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/30 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Profile Card Header */}
        <div className="relative bg-base-100 rounded-[2.5rem] shadow-xl shadow-base-300/50 overflow-hidden mb-8">
          {/* Decorative Background */}
          <div className="h-32 bg-gradient-to-r from-primary via-secondary to-accent opacity-20" />
          
          <div className="px-8 pb-8 flex flex-col items-center -mt-16">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-8 ring-base-100 shadow-2xl transition-transform group-hover:scale-105 duration-300">
                <img 
                  src={user.photoURL || "/default-avatar.png"} 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-1 right-1 bg-success w-6 h-6 rounded-full border-4 border-base-100 shadow-sm" title="Account Active"></div>
            </div>

            <div className="text-center mt-4">
              <h2 className="text-3xl font-black tracking-tight">{user.displayName || "Habitly User"}</h2>
              <p className="text-base-content/50 font-medium flex items-center justify-center gap-2 mt-1">
                <IoMailOutline /> {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Account Details */}
          <div className="bg-base-100 p-8 rounded-3xl border border-base-content/5">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <IoSettingsSharp className="text-primary" /> Account Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-60 flex items-center gap-2"><IoCalendarOutline /> Joined</span>
                <span className="font-bold">{user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A"}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-60 flex items-center gap-2"><IoShieldCheckmarkOutline /> Auth Provider</span>
                <span className="badge badge-outline font-bold uppercase text-[10px]">{user.providerData[0]?.providerId || "Email"}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-base-100 p-8 rounded-3xl border border-base-content/5 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2">Management</h3>
              <p className="text-sm text-base-content/60 mb-6">Update your account preferences or secure your data.</p>
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={signOutUser} className="btn btn-error btn-sm rounded-xl text-white">
                <IoLogOut /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-warning/10 border border-warning/20 p-6 rounded-2xl flex gap-4 items-start">
          <div className="p-2 bg-warning/20 rounded-lg text-warning">
            <IoShieldCheckmarkOutline size={24} />
          </div>
          <div>
            <h4 className="font-bold text-sm text-warning-content">Data Security</h4>
            <p className="text-xs text-warning-content/70 mt-1 leading-relaxed">
              Your account is synced across all devices. Always ensure you log out on public computers to keep your habit data secure.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;