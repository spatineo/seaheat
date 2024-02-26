interface HelloProps {
    label: string
}

export const Hello = ({label} : HelloProps ) => {
    return (<div>This is a Hello component, label: '{label}'</div>)
}
