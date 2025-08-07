'use client'

import {
  Container,
  Form,
  Nav,
  Navbar,
  Button,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import {addToHistory} from '@/lib/userData'
import { removeToken, readToken } from "@/lib/authenticate";

export default function MainNav() {
  let token = readToken();
  const router = useRouter();
  const currentPath = router.pathname;
  
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  

  function logout(){
    setIsExpanded(false);
    removeToken();
    router.push('/login');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsExpanded(false);
    if (searchField.trim()) {
      // setSearchHistory((current) => [
      //   ...current,
      //   `title=true&q=${searchField.trim()}`,
      // ]);
      setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
      router.push(`/artwork?title=true&q=${searchField.trim()}`);
    }
  }

  function handleNavClick() {
    setIsExpanded(false);
  }

  const isUserDropdownActive = 
    currentPath === "/favourites" ||
    currentPath === "/history";

  return (
    <>
      <Navbar
        expanded={isExpanded}
        expand="lg"
        className="fixed-top navbar-dark bg-dark"
      >
        <Container>
          <Navbar.Brand>Divyanshu Dugar</Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Left-aligned navigation links */}
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link active={currentPath === "/"} onClick={handleNavClick}>
                  Home
                </Nav.Link>
              </Link>
              {token && <Link href="/search" passHref legacyBehavior>
                <Nav.Link
                  active={currentPath === "/search"}
                  onClick={handleNavClick}
                >
                  Advanced Search
                </Nav.Link>
              </Link>}
            </Nav>

            {!token && 
            <Nav>
              <Link href="/login" passHref legacyBehavior>
                <Nav.Link active={currentPath === "/login"} onClick={handleNavClick}>
                  Login
                </Nav.Link>
              </Link>
              <Link href="/register" passHref legacyBehavior>
                <Nav.Link
                  active={currentPath === "/register"}
                  onClick={handleNavClick}
                >
                  Register
                </Nav.Link>
              </Link>
              </Nav>
            }

            {/* Right-aligned search form and dropdown */}
            <div className="d-flex">
              {token && <Form className="me-3" onSubmit={handleSubmit}>
                <div className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setSearchField(e.target.value)}
                  />
                  <Button type="submit" variant="success">
                    Search
                  </Button>
                </div>
              </Form>}

              <Nav>
                {token && <NavDropdown
                  title={token.userName}
                  id="basic-nav-dropdown"
                  align="end"
                  menuVariant="dark"
                  active={isUserDropdownActive}
                >
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={currentPath === "/favourites"}
                      onClick={handleNavClick}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>

                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={currentPath === "/history"}
                      onClick={handleNavClick}
                    >
                      Search History
                    </NavDropdown.Item>
                  </Link>

                    <NavDropdown.Item
                      active={currentPath === "/logout"}
                      onClick={logout}
                    >
                      Logout
                    </NavDropdown.Item>
                </NavDropdown>}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <br />
      <br />
    </>
  );
}