import {
  getCompletedTodayStats,
  getOverallStreak,
  getWeeklyConsistency,
} from "@/lib/dashboard-stats";
import { useHabits } from "./use-habits";
import { useMemo } from "react";

export const useDashboardStats = () => {
  const { data: habits = [], isPending, isError, error } = useHabits();

  const stats = useMemo(() => {
    const today = new Date();

    return {
      completedToday: getCompletedTodayStats(habits, today),
      currentStreak: getOverallStreak(habits, today),
      weeklyConsistency: getWeeklyConsistency(habits, today),
    };
  }, [habits]);

  return {
    ...stats,
    isPending,
    isError,
    error,
  };
};
