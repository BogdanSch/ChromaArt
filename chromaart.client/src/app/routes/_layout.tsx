export default MainLayout() {
    return <>
    <header className="header">

    </header>
    <main className="main">
     <Outlet />
    </main>
<footer className="footer">
  <div className="container">
    <div className="footer__wrap">
      <p className="footer__copyright">&copy; 2026 itsnotenderart. All rights reserved.</p>
      <p className="footer__credit">Developed by Bohdan</p>
    </div>
  </div>
</footer>
    </>
}