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
            <header className="bg-gray-900 text-white p-4">
              <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">MovieRating</h1>
                <nav>
                  <ul className="flex space-x-4">
                    <li>
                      <a href="/" className="hover:underline">Home</a>
                    </li>
                    <li>
                      <a href="/dashboard" className="hover:underline">Dashboard</a>
                    </li>
        
                    {user ? (
                      <li>
                        <button onClick={handleLogout} className="hover:underline">Logout</button>
                      </li>
                    ) : (
                      <li>
                        <a href="/login" className="hover:underline">Login</a>
                      </li>
                    )}
        
                  </ul>
                </nav>
              </div>
            </header>
          );
    }
}