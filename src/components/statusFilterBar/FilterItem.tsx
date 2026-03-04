type FilterItemProps = {
    label: string;
    isActive: boolean;
    onClick: () => void;
}   

export default function FilterItem({ label, isActive, onClick }: FilterItemProps) {


    return (
            <div className={`cursor-pointer px-16 py-8 rounded-full ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={onClick}>
                {label}
            </div>
    );
}