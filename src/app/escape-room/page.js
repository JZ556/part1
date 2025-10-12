export default function EscapeRoom() {
    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: 'url("/escape-room-image.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="container py-5 text-center">
                <h1 className="text-dark">Escape Room</h1>
            </div>
        </div>
    )
}