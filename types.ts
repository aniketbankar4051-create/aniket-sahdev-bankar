
export enum Goal {
  WeightLoss = 'weight loss',
  WeightGain = 'weight gain',
  Maintain = 'maintain',
}

export interface WeightEntry {
  date: string;
  weight: number;
}

export interface Checkin {
  date: string;
  done: boolean;
}

export interface Member {
  id: string;
  name: string;
  weightHistory: WeightEntry[];
  goal: Goal;
  dietPlan: string;
  workoutPlan: string;
  checkins: Checkin[];
}
