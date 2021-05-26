# !/usr/bin/env python3
# -*- coding: utf-8 -*-

import click
import msgpack
import msgpack_numpy as m
import numpy as np
import pandas as pd
from redis import StrictRedis
from scipy.sparse import csr_matrix
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

m.patch()


def generate_sim_matrix(filename: str, low_memory: bool = False) -> bytes:
    """Generate similarity matrix of given file.

    :param filename: CSV file
    :param low_memory: Low Memory. Default is `False`.
    :return: Msgpack
    """
    movie_data: pd.DataFrame = pd.read_csv(filename, low_memory=low_memory)
    tfidf_vector: TfidfVectorizer = TfidfVectorizer(analyzer='word', ngram_range=(1, 2), min_df=0,
                                                    stop_words='english')
    movie_data['overview']: pd.Series = movie_data['overview'].fillna('')
    tfidf_matrix: csr_matrix = tfidf_vector.fit_transform(movie_data['overview'])
    sim_matrix: np.ndarray = linear_kernel(tfidf_matrix, tfidf_matrix)
    return msgpack.packb(sim_matrix)


@click.command()
@click.option("--filename", required=True, type=str, help="CSV file that has movie data.")
@click.option("--host", required=True, type=str, help="Redis host")
@click.option("--port", default=6379, required=False, type=int, help="Redis port. Default is 6379")
@click.option("--db", default=0, required=False, type=int, help="Redis database. Default is 0")
@click.option("--low-memory", default=False, required=False, type=bool, help="Low memory. Default is False")
def main(filename: str, host: str, port: int = 6379, db: int = 0, low_memory: bool = False) -> None:
    """Main.

    :param filename: Movie data.
    :param host: Redis Host
    :param port: Redis port
    :param db: Redis db
    :param low_memory: Low memory?
    :return: None
    """
    conn: StrictRedis = StrictRedis(host, port=port, db=db)
    sim_matrix: bytes = generate_sim_matrix(filename, low_memory=low_memory)
    conn.set("sim_matrix", sim_matrix)


if __name__ == '__main__':
    main()
