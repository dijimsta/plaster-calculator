export type SidebarLayoutReducerState = {
    readonly isDesktop: boolean;
    readonly isSidebarOpen: boolean;
    readonly sidebarId: string;
};

export type SidebarLayoutCloseSidebarAction = {
    readonly type: "closeSidebar";
};

export type SidebarLayoutOpenSidebarAction = {
    readonly type: "openSidebar";
};

export type SidebarLayoutSetDesktopAction = {
    readonly type: "setDesktop";
    readonly isDesktop: boolean;
};

export type SidebarLayoutAction =
    | SidebarLayoutCloseSidebarAction
    | SidebarLayoutOpenSidebarAction
    | SidebarLayoutSetDesktopAction;

export function createInitialSidebarLayoutState(
    sidebarId: string,
): SidebarLayoutReducerState {
    return {
        isDesktop: false,
        isSidebarOpen: false,
        sidebarId,
    };
}

export function sidebarLayoutReducer(
    state: SidebarLayoutReducerState,
    action: SidebarLayoutAction,
): SidebarLayoutReducerState {
    switch (action.type) {
        case "closeSidebar":
            return { ...state, isSidebarOpen: false };
        case "openSidebar":
            return { ...state, isSidebarOpen: true };
        case "setDesktop":
            return {
                ...state,
                isDesktop: action.isDesktop,
                isSidebarOpen: action.isDesktop ? false : state.isSidebarOpen,
            };
    }
}
