import { Component} from "react";

export default class Header extends Component {
    render(){
        const handleLogout = () => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem('user');
            window.location.href = "/login";
          };
          
          let user = null;
        
          try {
            const storedUser = sessionStorage.getItem("user");
            user = storedUser ? JSON.parse(storedUser) : null;
          } catch (error) {
            console.error("Erro ao carregar usuário do sessionStorage:", error);
          }
          
          // const user = null;
          return (
            <header className="bg-dark text-white py-3">
              <div className="container d-flex justify-content-between align-items-center">
                <h1 className="h4 mb-0">C4P PetShop</h1>
                <nav>
                  <ul className="nav">
                    <li className="nav-item">
                      <a href="/" className="nav-link text-white">Home</a>
                    </li>
                    <li className="nav-item">
                      <a href="/dashboard" className="nav-link text-white">Dashboard</a>
                    </li>
        
                    {user ? (
                      <li className="nav-item">
                        <button onClick={handleLogout} className="nav-link text-white">Logout</button>
                      </li>
                    ) : (
                      <li className="nav-item">
                        <a href="/login" className="nav-link text-white">Login</a>
                      </li>
                    )}
        
                  </ul>
                </nav>
              </div>
            </header>
          );
    }
}