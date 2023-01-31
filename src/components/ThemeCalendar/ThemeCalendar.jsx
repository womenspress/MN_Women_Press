export default function ThemeCalendar(props){
    let year = props.year || new Date().getFullYear();

    return (
        <>
            <header>
                <p>
                    {year}
                </p>
            </header>
        </>
    )
}