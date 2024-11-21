import { create } from "zustand";

export const useAppStore = create((set) => ({
	// states
	expandedDrawerNav: null,
  mazeRows: 20,
  mazeCols: 30,

	// actions
	expandDrawerNav: (navId) =>
		set((state) => {
			if (state.expandedDrawerNav === navId) {
				return {
					expandedDrawerNav: null,
				};
			}

			return {
				expandedDrawerNav: navId,
			};
		}),
}));
