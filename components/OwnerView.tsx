
import React, { useState, useEffect } from 'react';
import { Member } from '../types';

interface OwnerViewProps {
  members: Member[];
  selectedMember: Member | null;
  onSelectMember: (member: Member) => void;
  onUpdateMember: (updatedMember: Member) => void;
}

const OwnerView: React.FC<OwnerViewProps> = ({ members, selectedMember, onSelectMember, onUpdateMember }) => {
  const [editedDietPlan, setEditedDietPlan] = useState('');
  const [editedWorkoutPlan, setEditedWorkoutPlan] = useState('');

  useEffect(() => {
    if (selectedMember) {
      setEditedDietPlan(selectedMember.dietPlan);
      setEditedWorkoutPlan(selectedMember.workoutPlan);
    }
  }, [selectedMember]);

  const handleSaveChanges = () => {
    if (selectedMember) {
      onUpdateMember({
        ...selectedMember,
        dietPlan: editedDietPlan,
        workoutPlan: editedWorkoutPlan,
      });
      alert('Changes saved!');
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-100px)]">
      <div className="md:w-1/3 bg-white p-4 rounded-lg shadow-md overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">Members</h2>
        <ul className="space-y-2">
          {members.map((member) => (
            <li key={member.id}>
              <button
                onClick={() => onSelectMember(member)}
                className={`w-full text-left p-3 rounded-md transition duration-200 ${
                  selectedMember?.id === member.id ? 'bg-cyan-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                {member.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md overflow-y-auto">
        {selectedMember ? (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{selectedMember.name}'s Dashboard</h2>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Weight History (kg)</h3>
              <ul className="bg-gray-50 p-3 rounded-md space-y-1 max-h-40 overflow-y-auto">
                {selectedMember.weightHistory.slice().reverse().map(entry => (
                   <li key={entry.date} className="flex justify-between text-gray-600">
                       <span>{new Date(entry.date).toLocaleDateString()}</span>
                       <span>{entry.weight} kg</span>
                   </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="dietPlan" className="text-xl font-semibold">Diet Plan</label>
              <textarea
                id="dietPlan"
                value={editedDietPlan}
                onChange={(e) => setEditedDietPlan(e.target.value)}
                className="w-full h-48 bg-gray-50 text-gray-900 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="workoutPlan" className="text-xl font-semibold">Workout Plan</label>
              <textarea
                id="workoutPlan"
                value={editedWorkoutPlan}
                onChange={(e) => setEditedWorkoutPlan(e.target.value)}
                className="w-full h-48 bg-gray-50 text-gray-900 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            
            <button
                onClick={handleSaveChanges}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-300"
            >
                Save Changes
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-xl">Select a member to view their details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerView;
