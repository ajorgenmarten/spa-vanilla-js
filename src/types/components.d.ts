export type OnSelectCallback = (user: User) => void
export interface UserSelectProps {
    placeholder?: string
    required?: boolean
    onSelect?: OnSelectCallback
}