import { Button } from "@/lib/components/button";
import { modalIds } from "@/lib/components/modals/modal-ids";
import { SignInModal } from "@/lib/components/modals/sign-in.modal";
import { SignUpModal } from "@/lib/components/modals/sign-up.modal";
import { openModal } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const { signInModal, signUpModal } = modalIds;

export const Route = createFileRoute("/(landing_page)/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    if (search.modal) {
      return {
        modal: search.modal as string,
      };
    }

    return null;
  },
});

function RouteComponent() {
  const search = Route.useSearch();

  useEffect(() => {
    if (search?.modal) {
      openModal(search.modal);
    }
  }, [search]);

  const openAuthModal = (modalId: string) => {
    window.history.pushState({}, "", `?modal=${modalId}`);
    openModal(modalId);
  };
  return (
    <main>
      <nav className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Button
                size={"sm"}
                variant={"ghost"}
                btnColor={"primary"}
                onClick={() => openAuthModal(signInModal)}
              >
                Sign in
              </Button>
            </li>
            <li>
              <Button
                size={"sm"}
                variant={"link"}
                btnColor={"primary"}
                onClick={() => openAuthModal(signUpModal)}
              >
                Sign up
              </Button>
            </li>
          </ul>
        </div>
      </nav>
      <SignInModal />
      <SignUpModal />
    </main>
  );
}
