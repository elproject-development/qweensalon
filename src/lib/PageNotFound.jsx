import { useLocation, Link } from 'react-router-dom';

export default function PageNotFound() {
    const location = useLocation();
    const pageName = location.pathname.substring(1);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
            <div className="max-w-md w-full">
                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-7xl font-light text-muted-foreground/30">404</h1>
                        <div className="h-0.5 w-16 bg-border mx-auto"></div>
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-2xl font-medium text-foreground" style={{ fontFamily: "'Lobster', cursive" }}>
                            Halaman Tidak Ditemukan
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Halaman <span className="font-medium text-foreground">"{pageName}"</span> tidak ditemukan.
                        </p>
                    </div>
                    <div className="pt-6">
                        <Link
                            to="/"
                            className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-full hover:opacity-90 transition-opacity"
                        >
                            Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}