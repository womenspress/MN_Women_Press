import React, { useState } from 'react';

// components
import { Box, Typography, TextField, Button, Menu, MenuItem } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

export default function SortFilterSearch(props) {

  /* 
  props: 
  sortOptions = string[], eg ['alphabetical', 'date', etc.]
  filterOptions = string[], eg  ['']
  searchTerm: a useState variable from parent component
  setSearchTerm: useState function from parent component

  sortMethod:
  setSortMethod

  filterMethod
  setFilterMethod
  */

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const [sortAnchor, setSortAnchor] = useState(null);
  const sortOpen = Boolean(sortAnchor)

  const [filterAnchor, setFilterAnchor] = useState(null);
  const filterOpen = Boolean(filterAnchor)


  const {
    sortOptions,
    filterOptions,
    searchTerm,
    setSearchTerm,
    sortMethod,
    setSortMethod,
    filterMethod,
    setFilterMethod
  } = props

  const openFilterMenu = (e) => {
    console.log('opening filter menu');
    setFilterAnchor(e.currentTarget)
  }

  const openSortMenu = (e) => {
    console.log('opening sort menu');
    setSortAnchor(e.currentTarget)
  }

  return (
    <Box>
      <Button
        endIcon={<SortIcon />}
        onClick={openSortMenu}
      >{sortMethod}</Button>
      <Button
        endIcon={<FilterListIcon />}
        onClick={openFilterMenu}
      >{filterMethod}</Button>

      <Menu
        anchorEl={sortAnchor}
        open={sortOpen}
        onClose={() => setSortAnchor(null)}
      >
        {sortOptions.map(option => {
          return (
            <MenuItem
              key={option}
              onClick={() => setSortMethod(option)}
            >
              {option}
            </MenuItem>
          )
        })}
      </Menu>

      <Menu
        anchorEl={filterAnchor}
        open={filterOpen}
        onClose={() => setFilterAnchor(null)}
      >
        {filterOptions.map(option => {
          return (
            <MenuItem
              key={option}
              onClick={() => setFilterMethod(option)}
            >
              {option}
            </MenuItem>
          )
        })}
      </Menu>
      <TextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size='small'
        placeholder='search'
      />

    </Box>
  )
}
