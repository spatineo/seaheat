import { IntakeState } from "../../app/slices/intake";

interface IntakeComponentProps extends IntakeState {
    setName: (name: string) => void,
    setDepth: (depth: number) => void,
    setLocation: (location: Array<number | null>) => void,
}

export const IntakeComponent = ({ location, depth, name, setName, setDepth, setLocation } : IntakeComponentProps) => {
    return (
        <div>
            <div>
                <label>
                    Name
                    <input type="text" value={name ? name : ""} onChange={(value) => setName(value.target.value)}></input>
                </label>
            </div>
            <div>
                <label>
                    Depth
                    <input type="number" value={depth ? depth : undefined} onChange={(value) => setDepth(Number(value.target.value))}></input>
                </label>
            </div>
            <div>
                <label>
                    Location
                    <input type="number" value={location[0] ? location[0] : undefined} onChange={(value) => setLocation([Number(value.target.value), location[1]])}></input>
                    <input type="number" value={location[1] ? location[1] : undefined} onChange={(value) => setLocation([location[0], Number(value.target.value)])}></input>
                </label>
            </div>
            
        </div>
    )
}