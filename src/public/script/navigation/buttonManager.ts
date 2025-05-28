type ButtonAction = () => void;

interface ButtonDefinition{
    id: string;
    action: ButtonAction;
}
// : Record<string, ButtonManager>
type ButtonManager = Record<string, ButtonAction>;

export const roleButtons  = {
    guest: (overlay: HTMLDivElement): ButtonManager => ({
        btn_close: ()=> {
            overlay.innerHTML="";
            overlay.style.display='none';
        },
        btn_home: ()=> {
             window.location.href = '/';
        },
        btn_user: ()=> {},
        btn_trip: ()=> {
             window.location.href = '/covoiturage';
        },


    }),
}