import { useState, useEffect } from "react";
import { 
  HiOutlineFire, 
  HiOutlineChartBar, 
  HiOutlineCheckCircle, 
  HiOutlineTrendingUp,
  HiOutlineDownload,
  HiOutlineCalendar
} from "react-icons/hi";
import { LuRotate3D } from "react-icons/lu";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const Stat = () => {
  // 1. Mock Data (Replace with your fetch() logic)
  const [data, setData] = useState([
    { name: "Mon", completed: 4, missed: 2 },
    { name: "Tue", completed: 7, missed: 1 },
    { name: "Wed", completed: 5, missed: 3 },
    { name: "Thu", completed: 8, missed: 0 },
    { name: "Fri", completed: 6, missed: 2 },
    { name: "Sat", completed: 9, missed: 1 },
    { name: "Sun", completed: 4, missed: 4 },
  ]);

  const overallStats = [
    { label: "Current Streak", value: "12 Days", icon: <HiOutlineFire />, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Completion Rate", value: "88%", icon: <HiOutlineCheckCircle />, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Total Habits", value: "8 Active", icon: <HiOutlineChartBar />, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Global Rank", value: "Top 5%", icon: <HiOutlineTrendingUp />, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const milestones = [
    { title: "Early Bird", sub: "5 Morning habits in a row", icon: "🌅" },
    { title: "Unstoppable", sub: "30 Day streak achieved", icon: "⚡" },
    { title: "Architect", sub: "10 Custom habits created", icon: "🏗️" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F1A] transition-colors duration-500 py-8 px-4 lg:px-8">
      <div className="max-w-[1600px] mx-auto">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Activity Insights</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Analyze your consistency and habit patterns.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2 shadow-sm">
              <HiOutlineCalendar className="text-blue-500 mr-2" />
              <select className="bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-700 dark:text-slate-300 outline-none cursor-pointer">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>All Time</option>
              </select>
            </div>
            <button className="btn bg-blue-600 hover:bg-blue-700 border-none text-white rounded-2xl px-6 flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20">
              <HiOutlineDownload className="text-lg" /> Export
            </button>
          </div>
        </div>

        {/* --- 4-Column Stat Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {overallStats.map((item, i) => (
            <div key={i} className="group bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] transition-all duration-300">
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110 duration-300 ${item.bg} ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Main Dashboard Content --- */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Progress Chart (2/3 Width) */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="font-black text-xl text-slate-900 dark:text-white">Consistency Score</h3>
                <p className="text-sm text-slate-500">Daily habit completion performance</p>
              </div>
              <div className="flex gap-4 text-[10px] font-black uppercase tracking-tighter">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Completed</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></span> Missed</span>
              </div>
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }} 
                    dy={15}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px' }}
                  />
                  <Bar dataKey="completed" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={35}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.completed > 6 ? '#2563EB' : '#3B82F6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side Module: Milestones (1/3 Width) */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl shadow-blue-500/20">
            <LuRotate3D className="absolute -right-16 -bottom-16 text-[15rem] opacity-10 rotate-12" />
            
            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-black mb-2">Milestones</h3>
                <p className="text-blue-100 text-sm font-medium">Keep going! You're 2 habits away from "Elite" status.</p>
              </div>

              <div className="space-y-4 flex-grow">
                {milestones.map((badge, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/10 p-4 rounded-3xl border border-white/10 backdrop-blur-md hover:bg-white/20 transition-all cursor-default">
                    <span className="text-3xl filter drop-shadow-md">{badge.icon}</span>
                    <div>
                      <p className="font-bold text-sm tracking-tight">{badge.title}</p>
                      <p className="text-[11px] text-blue-100 opacity-80 uppercase font-bold tracking-wider">{badge.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-8 w-full py-4 bg-white text-blue-600 font-black rounded-2xl text-sm hover:bg-blue-50 transition-colors shadow-lg">
                View All Achievements
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Stat;