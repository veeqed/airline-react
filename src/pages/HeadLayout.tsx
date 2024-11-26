const HeadLayout = () => {
    return (
    <div className="main-content md:container md:mx-auto">
    <nav className="pc-menu">
        <div className="airlogo">
            <a href="#"><img src={import.meta.env.VITE_PUBLIC_URL + '/logo.png'} /></a>
        </div>
            <ul className="list">
                <li>
                    <a href="" className="hover-underline-animation">BOOK</a>
                </li>
                <li>
                    <a href="" className="hover-underline-animation">BEFORE YOU FLY</a>
                </li>
                <li>
                    <a href="" className="hover-underline-animation">DURING YOUR TRIP</a>
                </li>
                <li>
                    <a href="" className="hover-underline-animation">TRAVEL INFORMATION</a>
                </li>
                <li>
                    <a href="" className="hover-underline-animation">HELP</a>
                </li>
                <li>
                    <a href="" className="hover-underline-animation">MY SERVICE</a>
                </li>
            </ul>

        </nav>
        <div className="clear"></div>
    </div>)
}

export default HeadLayout