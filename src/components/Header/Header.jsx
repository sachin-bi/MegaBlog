// logoutBtn will be conditional render
import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";

//by {useSelector} u'll get to know - if user loged in/Out
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  // state.auth.status -> auth is the name of the store(authSlice.js) , from where it'll get the data
  const authStatus = useSelector((state) => state.auth.status);
  // authStatus - true(loggedin) or false(not loggedin)

  // same as dispatch
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>

          <ul className="flex ml-auto">
            {/* // whenever html element repeats itself unique key attribute is needed */}
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-6 py2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}

          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
