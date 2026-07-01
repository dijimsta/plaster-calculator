export interface SidebarLayoutReducerState {
    readonly isDesktop: boolean;
    readonly isSidebarOpen: boolean;
    readonly sidebarId: string;
}

export interface SidebarLayoutCloseSidebarAction {
    readonly type: "closeSidebar";
}

export interface SidebarLayoutOpenSidebarAction {
    readonly type: "openSidebar";
}

export interface SidebarLayoutSetDesktopAction {
    readonly type: "setDesktop";
    readonly isDesktop: boolean;
}

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
