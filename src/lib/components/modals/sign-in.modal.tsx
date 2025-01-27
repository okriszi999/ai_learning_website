import { Button } from "../button";

const modalId = "sign-in-modal";

export function SignInModal() {
  function handleClose() {
    // remove modal='sign-in-modal' from url search params
    const url = new URL(location.href);
    url.searchParams.delete("modal");
    window.history.pushState({}, "", url);

    // close the modal
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal.close();
  }

  // close the modal when ESC key is pressed
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  });

  return (
    <>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Sign In</h3>
          <form className="space-y-4 mt-4">
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="modal-action">
              <Button type="submit" className="btn btn-primary">
                Sign In
              </Button>
              <Button type="button" className="btn" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export { modalId };
