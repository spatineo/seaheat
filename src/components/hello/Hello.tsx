import './Hello.css'

interface HelloProps {
    label: string
}

export const Hello = ({label} : HelloProps ) => {
    return (<div className="Hello">This is a Hello component <label>{label}</label></div>)
}
