import './Hello.css'

interface HelloProps {
    label: string
}

export const Hello = ({label} : HelloProps ) => {
    return (<div className="Hello">Location: <label>{label}</label></div>)
}
