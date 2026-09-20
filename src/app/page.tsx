import { Sidebar } from '../app/_components/sidebar';

export default function Home() {
    return (
        <div className="flex min-h-dvh flex-1 bg-[#0f111a]">
            <Sidebar />
            <main aria-label="Dashboard" className="min-w-0 flex-1" />
        </div>
    );
}
