"use client";

function error({ error, reset }: { error: Error; reset: () => void }) {
  // TODO: design this error page
  return (
    <div>
      {error.message} <br />
      <button onClick={reset}>Try Again</button>
    </div>
  );
}

export default error;
