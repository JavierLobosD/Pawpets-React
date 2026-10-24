// De Testing Library: cleanup (limpia) y screen (busca en pantalla)
import {cleanup, screen} from '@testing-library/react';
// El componente que se prueba
import ListaCategorias from '../components/ListaCategorias';
// Función para dibujar dentro de un router de prueba (los Link lo necesitan)
import { renderizar } from './ayudas';

//Pruebas del componente que muestra las tarjetas de categorias
describe('Componente ListaCategorias', () => {
    //Limpia la pantalla despues de cada prueba
    afterEach(cleanup);

    // Categorias de prueba (datos inventados, no los reales)
    // Se pasan por props, así la prueba no depende de db
    const categorias = [
        { id: 1, nombre: 'Alimentos Perro', imagen: '/a.jpg' },
        { id: 2, nombre: 'Salud', imagen: '/b.jpg' },
    ];

    //Debe haber una tarjeta por cada categoria que recibe
    it('muestra el nombre de cada categoría recibida por props', () => {
        renderizar(<ListaCategorias categorias={categorias} />);
        // Comprueba que aparecen los dos nombres
        expect(screen.getByText('Alimentos Perro')).toBeTruthy();
        expect(screen.getByText('Salud')).toBeTruthy();
    });

    //Cada tarjeta debe llevar a la pagina de su categoria
    it('cada tarjeta es un link a /categorias/id', () =>{
        renderizar(<ListaCategorias categorias={categorias} />);
        // Busca todos los links de la pantalla
        const links = screen.getAllByRole('link');
        // Comprueba que hay uno por categoría
        expect(links.length).toBe(2);
        // Comprueba que el primero lleva a la categoría 1
        expect(links[0].getAttribute('href')).toBe('/categorias/1');
    });
});