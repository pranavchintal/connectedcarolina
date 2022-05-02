import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div>
      <nav className="navbar py-2 px-5" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <h1 className="is-size-4 has-text-primary has-text-weight-bold">connectedcarolina</h1>
          </Link>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">

          </div>

          <div className="navbar-end">
            <Link to="/" className="navbar-item has-text-weight-medium has-text-primary">
              Home
            </Link>

            <Link to="create" className="navbar-item has-text-weight-medium has-text-primary">
              Create Group
            </Link>

            <Link to="feed" className="navbar-item has-text-weight-medium has-text-primary">
              My Groups
            </Link>
            <a className="navbar-link">
              <img src={require("../assets/profile_pic.png")} width="42" height="42" alt="profile pic" />
            </a>
          </div>
        </div>
      </nav >

    </div>

  )
}