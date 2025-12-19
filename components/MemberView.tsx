
import React, { useState } from 'react';
import { Member, Goal, WeightEntry } from '../types';
import { generateFitnessPlan } from '../services/geminiService';
import PlanCard from './PlanCard';
import { UserIcon } from './icons/UserIcon';
import { TargetIcon } from './icons/TargetIcon';
import { WeightIcon } from './icons/WeightIcon';

interface MemberViewProps {
  member: Member;
  onUpdateMember: (updatedMember: Member) => void;
}

const MemberView: React.FC<MemberViewProps> = ({ member, onUpdateMember }) => {
  const [newWeight, setNewWeight] = useState('');
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);

  const latestWeight = member.weightHistory[member.weightHistory.length - 1]?.weight || 0;

  const handleAddWeight = () => {
    const weightValue = parseFloat(newWeight);
    if (!isNaN(weightValue) && weightValue > 0) {
      const newEntry: WeightEntry = {
        date: new Date().toISOString(),
        weight: weightValue
      };
      onUpdateMember({ ...member, weightHistory: [...member.weightHistory, newEntry] });
      setNewWeight('');
    }
  };
  
  const handleGoalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateMember({ ...member, goal: e.target.value as Goal });
  };

  const handleGeneratePlan = async () => {
    if (!latestWeight) {
        alert("Please add your current weight first.");
        return;
    }
    setIsLoadingPlan(true);
    const { dietPlan, workoutPlan } = await generateFitnessPlan(latestWeight, member.goal);
    onUpdateMember({ ...member, dietPlan, workoutPlan });
    setIsLoadingPlan(false);
  };

  const today = new Date().toISOString().split('T')[0];
  const hasCheckedInToday = member.checkins.some(c => c.date.startsWith(today) && c.done);

  const handleCheckIn = () => {
    if (!hasCheckedInToday) {
      const newCheckin = { date: new Date().toISOString(), done: true };
      onUpdateMember({ ...member, checkins: [...member.checkins, newCheckin] });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-cyan-500 p-3 rounded-full">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{member.name}</h2>
            <p className="text-gray-500">Welcome back!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <label className="flex items-center space-x-2 text-lg font-semibold">
                    <WeightIcon className="w-6 h-6 text-cyan-500" />
                    <span>Current Weight: {latestWeight} kg</span>
                </label>
                <div className="flex space-x-2">
                    <input
                        type="number"
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)}
                        placeholder="Enter new weight"
                        className="flex-grow bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <button onClick={handleAddWeight} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                        Add
                    </button>
                </div>
            </div>
            <div className="space-y-4">
                <label htmlFor="goal" className="flex items-center space-x-2 text-lg font-semibold">
                    <TargetIcon className="w-6 h-6 text-cyan-500" />
                    <span>Your Goal</span>
                </label>
                <select id="goal" value={member.goal} onChange={handleGoalChange} className="w-full bg-gray-50 text-gray-900 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                    <option value={Goal.WeightLoss}>Weight Loss</option>
                    <option value={Goal.WeightGain}>Weight Gain</option>
                    <option value={Goal.Maintain}>Maintain</option>
                </select>
            </div>
        </div>
      </div>
      
      <div className="text-center">
          <button 
            onClick={handleGeneratePlan} 
            disabled={isLoadingPlan}
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoadingPlan ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating New Plan...
              </>
            ) : "Get AI Generated Plan"}
          </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlanCard title="Diet Plan" content={member.dietPlan} />
        <PlanCard title="Workout Plan" content={member.workoutPlan} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 shadow-lg md:hidden">
        <button 
            onClick={handleCheckIn}
            disabled={hasCheckedInToday}
            className="w-full bg-cyan-600 text-white font-bold py-4 rounded-lg text-xl transition duration-300 disabled:bg-gray-400 disabled:text-gray-500"
        >
            {hasCheckedInToday ? "Checked-in for Today!" : "Daily Check-in"}
        </button>
      </div>
       <div className="hidden md:block mt-6">
        <button 
            onClick={handleCheckIn}
            disabled={hasCheckedInToday}
            className="w-full bg-cyan-600 text-white font-bold py-4 rounded-lg text-xl transition duration-300 disabled:bg-gray-400 disabled:text-gray-500"
        >
            {hasCheckedInToday ? "Checked-in for Today!" : "Daily Check-in"}
        </button>
      </div>
    </div>
  );
};

export default MemberView;
