import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/about/_index"!
      <Outlet />
    </div>
  )
}
