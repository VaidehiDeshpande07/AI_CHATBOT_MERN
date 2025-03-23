// import Logo from "./Logo";

// import styles from "./Header.module.css";
// import { useAuth } from "../../context/context";
// import NavigationLink from "./NavigationLink";

// const Header = () => {
// 	const auth = useAuth();

// 	let links;

// 	if (auth?.isLoggedIn) {
// 		links = (
// 			<>
// 				<NavigationLink to='/chat' text='Go To Chat' />
// 				<NavigationLink to='/' text='Logout' onClick={auth.logout} />
// 			</>
// 		);
// 	} else {
// 		links = (
// 			<>
// 				<NavigationLink to='/login' text='Sign In'></NavigationLink>
// 				<NavigationLink to='/signup' text='Create an Account'></NavigationLink>
// 			</>
// 		);
// 	}

// 	return (
// 		<div className={styles.parent}>
// 			<div>
// 				<Logo />
// 			</div>
// 			<div>{links}</div>
// 		</div>
// 	);
// };

// export default Header;


import { useState, useEffect } from "react";
import Logo from "./Logo";
import styles from "./Header.module.css";
import { useAuth } from "../../context/context";
import NavigationLink from "./NavigationLink";
import { useTheme } from "../../context/ThemeContext";  // Import useTheme

const Header = () => {
    const auth = useAuth();
    const { theme, toggleTheme } = useTheme();  // Get theme and toggle function from context
    const [username, setUsername] = useState("My Account");
    const [dropdownOpen, setDropdownOpen] = useState(false);

	

    useEffect(() => {
        if (auth?.isLoggedIn) {
            setUsername(auth?.user?.name || "User");
        }
    }, [auth?.isLoggedIn]);

    return (
        <div className={styles.parent}>
            <div>
                <Logo />
            </div>
            <div className={styles.navLinks}>
                {auth?.isLoggedIn ? (
                    <>
                        {/* New Button with dynamic theme styling */}
                        <button 
                            className={`${styles.newButton} ${theme === 'dark' ? styles.darkButton : styles.lightButton}`}
                            onClick={toggleTheme}  // Toggle theme on button click
                        >
                            Change Theme
                        </button>
                        
                        <NavigationLink to='/chat' text='Go To Chat' />
                        <div className={styles.accountDropdown}>
                            <button 
                                className={styles.accountButton} 
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                {username} ▾
                            </button>
                            {dropdownOpen && (
                                <div className={styles.dropdownMenu}>
                                    <NavigationLink to="/" text="Dashboard" />
                                    <NavigationLink to="/graphs" text="Graphs" />
                                    <NavigationLink to="/forms" text="Forms" />
                                    <NavigationLink to="/tabs" text="Tabs" />
                                    <NavigationLink to="/" text="Logout" onClick={auth.logout} />
                                </div>
                            )}
                        </div>
                    </>
                ) : (
					
                    <>
                          <button 
                            className={`${styles.newButton} ${theme === 'dark' ? styles.darkButton : styles.lightButton}`}
                            onClick={toggleTheme}  // Toggle theme on button click
                        >
                            Change Theme
                        </button>
                        <NavigationLink to='/login' text='Sign In' />
                        <NavigationLink to='/signup' text='Create an Account' />
						
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;




// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Logo from "./Logo";
// import styles from "./Header.module.css";
// import { useAuth } from "../../context/context";
// import NavigationLink from "./NavigationLink";

// const Header = () => {
//     const auth = useAuth();
//     const [username, setUsername] = useState("My Account");
//     const [dropdownOpen, setDropdownOpen] = useState(false);

//     useEffect(() => {
//         if (auth?.isLoggedIn) {
//             // Fetch user data from DB (Mocked for now, replace with API call)
//             setUsername(auth?.user?.name || "User");
//         }
//     }, [auth?.isLoggedIn]);

//     return (
//         <div className={styles.parent}>
//             <div>
//                 <Logo />
//             </div>
//             <div className={styles.navLinks}>
//                 {auth?.isLoggedIn ? (
//                     <>
//                         <NavigationLink to='/chat' text='Go To Chat' />
//                         <div className={styles.accountDropdown}>
//                             <button 
//                                 className={styles.accountButton} 
//                                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                             >
//                                 {username} ▾
//                             </button>
//                             {dropdownOpen && (
//                                 <div className={styles.dropdownMenu}>
//                                     <NavigationLink to="/dashboard" text="Dashboard" />
//                                     <span className={styles.dropdownItem}>Graphs</span>
//                                     <span className={styles.dropdownItem}>Forms</span>
//                                     <span className={styles.dropdownItem}>Tabs</span>
//                                     <NavigationLink to="/" text="Logout" onClick={auth.logout} />
//                                 </div>
//                             )}
//                         </div>
//                     </>
//                 ) : (
//                     <>
//                         <NavigationLink to='/login' text='Sign In' />
//                         <NavigationLink to='/signup' text='Create an Account' />
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Header;