export const navButtons = {
    index: {
        btn_validation: () => {
            const input = document.getElementById('field_dest');
            if (!input)
                return;
            const value = input.value.trim();
            if (!value)
                return;
            const params = new URLSearchParams({ adressDest: value });
            window.location.href = `/covoiturage?${params.toString()}`;
        }
    }
};
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
