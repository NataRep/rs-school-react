export const reloadPage = (
  reloadFn: () => void = window.location.reload.bind(window.location),
) => {
  reloadFn();
};
