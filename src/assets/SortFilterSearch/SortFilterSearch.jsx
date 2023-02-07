import React, { useState } from 'react';

// components
import { Box, Typography, TextField, Button, Menu, MenuItem, IconButton, ButtonGroup } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ReplayIcon from '@mui/icons-material/Replay';

export default function SortFilterSearch(props) {

  /* 
  props: 
  sortOptions = string[], eg ['alphabetical', 'date', etc.]
  filterOptions = string[], eg  ['']
  searchTerm: a useState variable from parent component
  setSearchTerm: useState function from parent component

  sortMethod:
  setSortMethod

  sortDirection
  setSortDirection

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
    sortDirection,
    setSortDirection,
    filterMethod,
    setFilterMethod
  } = props

  const handleReset = () => {
    setSortMethod(sortOptions[0]);
    setFilterMethod(filterOptions[0]);
    setSortDirection('ascending');
    setSearchTerm('');
  }


  const openFilterMenu = (e) => {
    console.log('opening filter menu');
    setFilterAnchor(e.currentTarget)
  }

  const openSortMenu = (e) => {
    console.log('opening sort menu');
    setSortAnchor(e.currentTarget)
  }

  const toggleSortDirection = () => {
    if (sortDirection === 'ascending') setSortDirection('descending')
    if (sortDirection === 'descending') setSortDirection('ascending')
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center',}}>
      <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
        <Button
          size='small'
          onClick={handleReset}
        >
          <ReplayIcon sx={{ height: 20, width: 20 }} />
        </Button>
        <ButtonGroup>
          <Button
            onClick={openSortMenu}
            sx={{ textTransform: 'none' }}
            variant='text'
            size='small'
          >{sortMethod}
          </Button>
          <Button
            onClick={toggleSortDirection}
            variant='text'
            sx={{ paddingLeft: 0 }}
            size='small'
          >
            {sortDirection === 'ascending' && <ArrowDropDownIcon />}
            {sortDirection === 'descending' && <ArrowDropUpIcon />}
          </Button>
        </ButtonGroup>


        <Button
          endIcon={<FilterListIcon />}
          onClick={openFilterMenu}
          sx={{ textTransform: 'none' }}
          size='small'
        >{filterMethod}</Button>
      </Box>
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
