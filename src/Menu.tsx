import './CSS/Menu.css';


type MenuPageProps = {
    onLogout: () => void;
};

function MenuPage({ onLogout }: MenuPageProps) {


    return (
        <div>
            <div>
                <button className="logout-button" onClick={onLogout}>Logout</button>
            </div>

        </div>
    );
}

export default MenuPage;