import Header from "./components/shared/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import { useAuth } from "./context/context";
import { ThemeProvider} from "./context/ThemeContext"; // Import ThemeProvider
import styles from "./App.module.css";
import Graphs from "./components/shared/Graph";
import Forms from "./components/shared/Forms";
import Tabs from "./components/shared/Tabs";

function App() {
	let routes;
	if (useAuth()?.isLoggedIn) {
		routes = (
			<Routes>
				<Route path='/' element={<Home />} />
				{/* <Route path='/login' element={<Chat />} /> */}
				<Route path='/chat' element={<Chat />} />
		        <Route path='/graphs' element={<Graphs />} />
				<Route path='/forms' element={<Forms />} />
				<Route path='/tabs' element={<Tabs />} />
			</Routes>
		);
	} else {
		routes = (
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
			</Routes>
		);
	}
      
	return (
		<ThemeProvider>
		<div>
			<Header />
			<main className={styles.routes}>
                {routes}
            </main>
		</div>
		</ThemeProvider>
	);
}

export default App;
