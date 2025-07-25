import { defineStore } from 'pinia'

interface DashboardStats {
  tripCount: number
  attractionCount: number
  orderCount: number
  todayOrderCount: number
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardStats => ({
    tripCount: 0,
    attractionCount: 0,
    orderCount: 0,
    todayOrderCount: 0
  }),
  actions: {
    setStats(stats: DashboardStats) {
      this.tripCount = stats.tripCount
      this.attractionCount = stats.attractionCount
      this.orderCount = stats.orderCount
      this.todayOrderCount = stats.todayOrderCount
    }
  }
})