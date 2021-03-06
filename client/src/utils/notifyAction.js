/**
 * The notify action creates an overloaded redux action.
 *
 * By passing strategical params, the redux action will contain
 * valuable information to oost the redux/saga process.
 *
 * @type          Action type (Eg. FETCH_DATA).
 * @data          (optional) An object containing the payload to the saga.
 * @loader        (optional) A boolean to notify that we want to show a loader in the screen.
 * @callback      (optional) A function that will be called after the saga has finished with any data processed.
 */
const notifyAction = ({
    type,
    data = {},
    loader = false,
    callback = undefined,
    ...rest
}) => ({
    type,
    callback,
    data,
    loader,
    notifier: true,
    ...rest,
});

export default notifyAction;
