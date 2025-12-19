
import React, { useState, useEffect } from 'react';
import { Member, Goal } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import MemberView from './components/MemberView';
import OwnerView from './components/OwnerView';
import Login from './components/Login';

const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    weightHistory: [{ date: new Date(Date.now() - 86400000 * 7).toISOString(), weight: 70 }, { date: new Date().toISOString(), weight: 69 }],
    goal: Goal.WeightLoss,
    dietPlan: '### Diet Plan\n- **Breakfast:** Oatmeal with berries\n- **Lunch:** Grilled chicken salad\n- **Dinner:** Baked salmon with vegetables',
    workoutPlan: '### Workout Plan\n- **Monday (Push):** Bench Press 3x8, Overhead Press 3x10, Tricep Pushdowns 3x12\n- **Wednesday (Pull):** Pull-ups 3xAMRAP, Barbell Rows 3x8, Bicep Curls 3x12\n- **Friday (Legs):** Squats 3x8, Lunges 3x10, Calf Raises 3x15',
    checkins: [{ date: new Date(Date.now() - 86400000).toISOString(), done: true }]
  },
  {
    id: '2',
    name: 'Bob Williams',
    weightHistory: [{ date: new Date(Date.now() - 86400000 * 14).toISOString(), weight: 80 }, { date: new Date().toISOString(), weight: 82 }],
    goal: Goal.WeightGain,
    dietPlan: '### Diet Plan\n- **Meal 1:** Scrambled eggs with toast\n- **Meal 2:** Greek yogurt with nuts\n- **Meal 3:** Steak with rice and broccoli\n- **Meal 4:** Protein shake',
    workoutPlan: '### Workout Plan\n- **Day 1 (Full Body):** Squats 4x6, Deadlifts 3x5, Bench Press 4x6\n- **Day 2 (Full Body):** Overhead Press 4x8, Bent Over Rows 4x8, Dips 3x10',
    checkins: []
  }
];

type UserRole = 'owner' | 'member';

const App: React.FC = () => {
  const [members, setMembers] = useLocalStorage<Member[]>('as-fitness-members', MOCK_MEMBERS);
  const [user, setUser] = useState<{ role: UserRole } | null>(null);
  const [isOwnerView, setIsOwnerView] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(members.length > 0 ? members[0] : null);

  useEffect(() => {
    if (!selectedMember && members.length > 0) {
      setSelectedMember(members[0]);
    }
    if (selectedMember && !members.find(m => m.id === selectedMember.id)) {
       setSelectedMember(members.length > 0 ? members[0] : null);
    }
  }, [members, selectedMember]);

  const handleLogin = (role: UserRole) => {
    setUser({ role });
    setIsOwnerView(role === 'owner');
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleUpdateMember = (updatedMember: Member) => {
    const newMembers = members.map(m => (m.id === updatedMember.id ? updatedMember : m));
    setMembers(newMembers);
    if (selectedMember?.id === updatedMember.id) {
        setSelectedMember(updatedMember);
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const currentMemberForView = isOwnerView ? selectedMember : members[0]; // Member view always sees the first member for simplicity

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <Header 
        isOwnerView={isOwnerView} 
        onToggleView={() => setIsOwnerView(!isOwnerView)} 
        userRole={user.role}
        onLogout={handleLogout}
      />
      <main className="p-4 pb-20 max-w-4xl mx-auto">
        {isOwnerView ? (
          <OwnerView 
            members={members} 
            selectedMember={selectedMember} 
            onSelectMember={setSelectedMember}
            onUpdateMember={handleUpdateMember} 
          />
        ) : (
          currentMemberForView ? (
            <MemberView 
              member={currentMemberForView} 
              onUpdateMember={handleUpdateMember} 
            />
          ) : (
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold">No Members Found</h2>
                <p className="text-gray-500 mt-2">Switch to Owner View to add members.</p>
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default App;
