export default function SmallLoader({
    isOptimistic
}) {

    return (
        <div className={isOptimistic ? "loader-small extra-small" : "loader-small"}></div>
    )
}