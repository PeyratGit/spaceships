import './Starship.css'

export const Starship = ({name, creation_date}) => {

  const date = new Date(creation_date)

  return (
    <div className="starship">
      <h3>{name}</h3>
      <span>
        {
          ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear()
          + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' +
          ('0' + date.getSeconds()).slice(-2)
        }
      </span>
    </div>
  )
}
