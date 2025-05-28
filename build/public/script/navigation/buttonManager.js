export const roleButtons = {
    guest: (overlay) => ({
        btn_close: () => {
            overlay.innerHTML = "";
            overlay.style.display = 'none';
        },
        btn_home: () => {
            window.location.href = '/';
        },
        btn_user: () => { },
        btn_trip: () => {
            window.location.href = '/covoiturage';
        },
    }),
};
