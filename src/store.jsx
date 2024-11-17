import { create } from "zustand";

export const useAppStore = create((set) => ({
	// states
	expandedDrawerNav: null,

	// actions
	expandDrawerNav: (navId) =>
		set((state) => {
      console.log(navId)
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
