import "./Modal.css"

export default function Modal({children, className}){
    return (
        <section className={`modal ${className}`}>
            {children}
        </section>
    )
}