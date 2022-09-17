import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import CommentIcon from '@mui/icons-material/Comment'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'

export default function CheckboxList({ listData, removeItems }) {
  const [checked, setChecked] = React.useState([])

  const handleToggle = (value) => async () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    await setChecked(newChecked)
  }

  async function remove() {
    await removeItems(checked)
    setChecked([])
  }

  React.useEffect(() => {
    console.log('cheked', checked)
  }, [checked])

  return (
    <>
      {checked.length > 0 ? (
        <Button
          onClick={() => remove()}
          color="error"
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Remover {checked.length} produtos selecionados
        </Button>
      ) : (
        <></>
      )}
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          maxHeight: '50vh',
          overflow: 'auto',
        }}
        style={{
          backgroundColor: '#fbfbec',
        }}
      >
        {listData.map((item) => {
          const labelId = `checkbox-list-label-${item.id}`

          return (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <ListItemText
                    id={labelId}
                    primary={`${item.quantidade} Un`}
                  />
                  <ListItemText id={labelId} primary={`.............`} />
                  <ListItemText
                    id={labelId}
                    primary={`R$ ${(item.quantidade * item.value)
                      .toFixed(2)
                      .toLocaleString()}`}
                  />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(item.id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(item.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  style={{ maxWidth: '50%' }}
                  id={labelId}
                  primary={`${item.name}`}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}
