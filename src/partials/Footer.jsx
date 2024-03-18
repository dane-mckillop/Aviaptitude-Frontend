import '../styles/Footer.css';

/**
 * Partial component rendered at the bottom of all pages.
 * Includes references and additional resources.
 */
const Footer = () => {
    return (
        <div className='footer-container'>
            <a className='link' href="https://www.freepik.com/">Art by Freepik</a>
            <a className='link' href="https://www.fdmgroup.com/en-au/au-home/">&copy; FDM Group</a>
            <a className='link' href="https://icons8.com/">Icons by Icons8</a>
        </div>
    )
}

export default Footer